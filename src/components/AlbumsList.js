import { useFetchAblumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAblumsQuery(user);

  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };
  let content;
  if (isLoading) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div> there was an error!!!!</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          list of Photos in the ablum
        </ExpandablePanel>
      );
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Ablums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>+Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
