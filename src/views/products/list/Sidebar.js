// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, Form, Input, Spinner, Row, Col } from 'reactstrap'

// ** Store & Actions
import { getCategory, getProducts } from '../../ecommerce/store'
import { useDispatch, useSelector } from 'react-redux'
import { request } from '../../../services/utilities'
import { Camera } from 'react-feather'

// ** DraftJS / WYSIWYG Editor
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import "./editor.css"

const SidebarNewUsers = ({
  open,
  toggleSidebar,
  title,
  price,
  description,
  categoryId,
  setCategoryId,
  featured_image,
  setFeaturedImage,
  other_images,
  setOtherImages,
  setTitle,
  setPrice,
  setDescription,
  editmode,
  setEditmode,
  setProductId,
  productId
}) => {
  // ** States
  const store = useSelector(state => state.ecommerce)
  const categories = store.allCategory
  const activeUser = useSelector(state => state.ecommerce.loggedUser)
  const [loading, setLoading] = useState(false)
  const [featuredRawFile, setFeaturedRawFile] = useState(null)
  const [otherRawFiles, setOtherRawFiles] = useState([])
  const [featuredPreview, setFeaturedPreview] = useState(featured_image || '')
  const [otherPreviews, setOtherPreviews] = useState(other_images || [])
  const [errmsg, setErrmsg] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  // ** Store Vars
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  // ** React Hook Form Init
  const defaultValues = {
    title: title || '',
    price: price || '',
    description: description || ''
  }

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues })

  // Synchronize description into react-hook-form whenever draft state updates
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState)
    const rawContentState = convertToRaw(newEditorState.getCurrentContent())
    const markup = draftToHtml(rawContentState)
    setValue('description', markup)
  }

  // ** File Handlers
  const onChangeHandlerForFeaturedImage = (file) => {
    if (file) {
      setFeaturedRawFile(file)
      setFeaturedPreview(URL.createObjectURL(file))
      setErrmsg('')
    }
  }

  const onChangeHandlerForOtherImages = (fileList) => {
    if (fileList && fileList.length > 0) {
      const filesArr = Array.from(fileList)
      setOtherRawFiles(filesArr)
      const previewUrls = filesArr.map(file => URL.createObjectURL(file))
      setOtherPreviews(previewUrls)
    }
  }

  const handleSidebarClosed = () => {
    setCategoryId('')
    setTitle('')
    setPrice('')
    setDescription('')
    setProductId('')
    setFeaturedImage('')
    setOtherImages([])
    setFeaturedPreview('')
    setOtherPreviews([])
    setFeaturedRawFile(null)
    setOtherRawFiles([])
    setEditmode(false)
    setErrmsg('')
    toggleSidebar()
  }

  const uploadToCloudinary = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/doxlmaiuh/image/upload'
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "uniabj")

    const res = await fetch(cloudUrl, { method: 'POST', body: formData })
    const data = await res.json()
    return data.secure_url
  }

  const handleAddProduct = async (formData, featuredImgUrl, otherImgUrls) => {
    const url = `product`
    const url_update = `products/${productId}`

    const dataObj = {
      title: formData.title,
      description: formData.description,
      featured_image: featuredImgUrl,
      images: otherImgUrls,
      category: categoryId?.value ? categoryId?.value : categoryId?._id,
      user: activeUser._id,
      price: formData.price
    }
    try {
      const rs = await request(
        editmode ? url_update : url,
        editmode ? 'PUT' : 'POST',
        false,
        dataObj
      )

      if  (rs.status === 'ok') {
         dispatch(getProducts(store.params))
        setLoading(false);
        handleSidebarClosed()
      }
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  const onSubmit = async (formData) => {
    if (!categoryId) {
      return setErrmsg('Please select a category.')
    }

    if (!featuredRawFile && !featured_image) {
      return setErrmsg('Kindly choose a featured image.')
    }

    setLoading(true)
    setErrmsg('')
    try {
      // Handle Featured Image Upload
      let uploadedFeaturedUrl = featured_image
      if (featuredRawFile) {
        uploadedFeaturedUrl = await uploadToCloudinary(featuredRawFile)
        setFeaturedImage(uploadedFeaturedUrl)
      }

      // Handle Other Images Upload
      let uploadedOtherUrls = [...(other_images || [])]
      if (otherRawFiles.length > 0) {
        const uploadPromises = otherRawFiles.map(file => uploadToCloudinary(file))
        const newUrls = await Promise.all(uploadPromises)
        uploadedOtherUrls = [...uploadedOtherUrls, ...newUrls]
        setOtherImages(uploadedOtherUrls)
      }

      await handleAddProduct(formData, uploadedFeaturedUrl, uploadedOtherUrls)
    } catch (err) {
      setLoading(false)
      console.error('Image upload failed', err)
      setErrmsg('Failed to upload images. Please try again.')
    }
  }
  useEffect(() => {
    if (editmode && description) {
      const blocksFromHtml = htmlToDraft(description)

      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml

        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        )

        setEditorState(EditorState.createWithContent(contentState))
      }
    } else if (!editmode) {
      setEditorState(EditorState.createEmpty())
    }
  }, [description, editmode])
  return (
    <Sidebar
      size='xl'
      open={open}
      title={editmode ? 'Edit Product' : 'New Product'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleSidebarClosed}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className='mb-1'>
          <Label className='form-label' for='title'>
            Title <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='title'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input id='title' placeholder='Title' invalid={!!errors.title} {...field} />
            )}
          />
        </div>

        {/* Image Pickers */}
        <div className='mb-1'>
          <div className='d-flex justify-content-between align-items-center mb-1'>
            {errmsg && (
              <Label className='form-label bg-danger style-pad' style={{ padding: '5px', borderRadius: '5px' }}>
                <span className='text-white'>{errmsg}</span>
              </Label>
            )}
            <Row className='w-100'>
              <Col>
                <div id='featured-img-preview'>
                  <Input
                    id='choose-featured-image'
                    type='file'
                    onChange={e => onChangeHandlerForFeaturedImage(e.target.files[0])}
                    className='d-none'
                    accept='image/*'
                  />
                  <Label className='form-label btn btn-secondary w-100' for='choose-featured-image'>
                    Featured Image <Camera size={15} />
                  </Label>
                </div>
              </Col>
              <Col>
                <div id='other-imgs-preview'>
                  <Input
                    id='choose-other-images'
                    type='file'
                    multiple
                    onChange={e => onChangeHandlerForOtherImages(e.target.files)}
                    className='d-none'
                    accept='image/*'
                  />
                  <Label className='form-label btn btn-secondary w-100' for='choose-other-images'>
                    Other Images <Camera size={15} />
                  </Label>
                </div>
              </Col>
            </Row>
          </div>

          {/* Image Previews */}
          <Row>
            <Col xs='6'>
              {featuredPreview && (
                <img src={featuredPreview} className='img-thumbnail' alt='Featured Preview' />
              )}
            </Col>
            <Col xs='6' className='d-flex flex-wrap gap-1'>
              {otherPreviews.map((src, i) => (
                <img src={src} key={i} className='img-thumbnail' style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt='Preview' />
              ))}
            </Col>
          </Row>
        </div>

        {/* Category */}
        <div className='mb-1'>
          <Label className='form-label' for='Category'>
            Category <span className='text-danger'>*</span>
          </Label>
          <Select
            isClearable={false}
            classNamePrefix='select'
            value={categoryId}
            options={categories}
            theme={selectThemeColors}
            onChange={e => setCategoryId(e)}
          />
        </div>

        {/* Price */}
        <div className='mb-1'>
          <Label className='form-label' for='price'>
            Price <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='price'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type='number'
                id='price'
                placeholder='33.33'
                invalid={!!errors.price}
                {...field}
              />
            )}
          />
        </div>

        {/* Description Editor */}
        <div className='mb-1'>
          <Label className='form-label' for='description'>
            Description <span className='text-danger'>*</span>
          </Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            value={editorState}
          />
        </div>

        {/* Actions */}
        <Button type='submit' className='me-1' color='primary' disabled={loading}>
          {editmode ? "Update" : "Save"}
        </Button>
        <Button type='button' color='secondary' outline onClick={handleSidebarClosed} disabled={loading}>
          Cancel
        </Button>
        {loading && <Spinner color='primary' className='float-end' />}
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers