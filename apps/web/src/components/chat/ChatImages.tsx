import { Attachment } from "../../types/attachment";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { getOriginal } from "../../api-file-server/get-original";
import { getMediumImg } from "../../api-file-server/get-medium-img";
import { Image } from "@chakra-ui/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "./style.css";

interface Props {
  images: Attachment[];
}
export const ChatImages = ({ images }: Props) => {
  if (images.length === 1) {
    return <Image src={getMediumImg(images[0].src)} alt={images[0].fileName} />;
  }
  return <ChatMultiImages images={images} />;
};

export const ChatMultiImages = ({ images }: Props) => {
  return (
    <LightGallery plugins={[lgThumbnail]} elementClassNames={"gallery"}>
      {images.map((image) => (
        <a
          style={{ marginRight: "4px" }}
          className="gallery-item"
          key={image.ID}
          href={getOriginal(image.src)}
          data-sub-html={`<h4>${image.fileName}</h4><p>${image.size} bytes</p>`}
        >
          <img
            src={getMediumImg(image.src)}
            alt={image.fileName}
            className="img-responsive"
          />
        </a>
      ))}
    </LightGallery>
  );
};
