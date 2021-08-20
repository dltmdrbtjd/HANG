import AWS from 'aws-sdk';

// types
interface blob {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

AWS.config.update({
  region: 'ap-northeast-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-2:d02afe22-f859-40bb-aedb-0c5dead2f8d1',
  }),
});

const uploadProfileImage = (image: blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'hang-image-upload/profile',
        Key: image.name,
        Body: image,
      },
    });

    const promise = upload.promise();

    promise
      .then(() => {
        resolve(
          `https://dpcgepgmqx2vj.cloudfront.net/profile/${image.name}?w=100&h=100`,
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default uploadProfileImage;
