import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { DropzoneContainer } from './styled'

export function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })

    console.log(acceptedFiles);
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <DropzoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Solte aqui o seu esquema elétrico</p> :
          <p>Arraste aqui o seu esquema elétrico</p>
      }
    </DropzoneContainer>
  )
}