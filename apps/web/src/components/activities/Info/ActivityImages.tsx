import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { getActivityImages } from "../../../api/activities/getActivityImages";
import { useActivityProvider } from "../ActivityCtx";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { Image } from "@chakra-ui/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "./style.css";
import { getOriginal } from "../../../api-file-server/get-original";
import { getMediumImg } from "../../../api-file-server/get-medium-img";

export const ActivityImages = () => {
  const { activity } = useActivityProvider();
  const queryKey = useMemo(
    () => ["Activity", activity.ID, "images"],
    [activity.ID]
  );
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      return getActivityImages(activity.ID, pageParam);
    },
    getNextPageParam: ({ meta: { nextCursor } }) => nextCursor,
    getPreviousPageParam: ({ meta: { prevCursor } }) => prevCursor,
    queryKey,
  });

  const items = useMemo(() => {
    return data?.pages.map((page) => page.data).flat();
  }, [data?.pages]);

  return (
    <LightGallery plugins={[lgThumbnail]} elementClassNames={"gallery"}>
      {items?.map((image) => (
        <a
          className="gallery-item"
          key={image.ID}
          href={getOriginal(image.src)}
          data-sub-html={`<h4>${image.fileName}</h4><p>${image.size} bytes</p>`}
        >
          <Image
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1/1",
              objectFit: "cover",
            }}
            src={getMediumImg(image.src)}
            alt={image.fileName}
            className="img-responsive"
          />
        </a>
      ))}
    </LightGallery>
  );
};
