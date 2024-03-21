import React from "react";
import styled from "styled-components";
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import { getMockSenderEnhancer } from "@rpldy/mock-sender";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";

const PreviewImage = styled.img`
  margin: 5px;
  max-width: 200px;
  height: auto;
  transition: opacity 0.4s;

  ${({ completed }) => `opacity: ${completed / 100};`}
`;

const CustomImagePreview = ({ id, url }) => {
  const { completed } = useItemProgressListener(id) || { completed: 0 };

  //preview will become more opaque as upload progresses
  return <PreviewImage src={url} completed={completed} />;
};

const UploadWithProgressPreview = () => {
  return (
    <>
      <UploadButton>Procurar imagem</UploadButton>
      <br />
      <UploadPreview PreviewComponent={CustomImagePreview} />
    </>
  );
};

const mockSenderEnhancer = getMockSenderEnhancer({ delay: 1500 });

const Upload = () => (
	<Uploady
      destination={{ url: "https://cvfggtwoyyhatnhuumla.supabase.co/storage/v1/object/public/noticias/" }}
      enhancer={mockSenderEnhancer}
      headers={{Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZmdndHdveXloYXRuaHV1bWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjQ4MzUsImV4cCI6MjAyNDcwMDgzNX0.J3gAiKHuVISlAc-gVolEYSVx-ADzsNIE2APAdGclcAY"}}
    >
        <UploadWithProgressPreview />
    </Uploady>
);

export default Upload