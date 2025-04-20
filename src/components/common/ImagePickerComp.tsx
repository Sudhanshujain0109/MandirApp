import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import requestPermission from '../../Utilities/getImagePermission';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {
  setSelectedImage: (value: object) => void;
  imageData: string;
};

const AddNewImage = ({setSelectedImage, imageData}: Props) => {
  const [path, setPath] = useState(imageData);

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.assets && response.assets.length > 0) {
          const image = response.assets[0];
          if (!image.uri || !image.type || !image.fileName) return;

          setPath(image.uri);
          const formData = new FormData();
          formData.append('file', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          });
          formData.append('fileName', image.fileName);

          try {
            const response = await fetch(
              'http://172.105.56.136:8080/upload-image',
              {
                method: 'POST',
                body: formData,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
              const result = await response.json();
              setSelectedImage({
                filename: image.fileName,
                type: image.type,
                filePath: result?.filePath,
              });
            console.log('Upload response:', result);
          } catch (err) {
            console.error('Upload failed:', err);
          }
        }
      },
    );

  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      style={{
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: path ? 'transparent' : 'rgba(208,137,90,0.7)',
        overflow: 'hidden',
      }}>
      {path ? (
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={{uri: path}}
        />
      ) : (
        <Text style={{fontSize: 32, color: 'white'}}>+</Text>
      )}
    </TouchableOpacity>
  );
};

export default AddNewImage;
