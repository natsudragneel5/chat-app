import React from "react";
import { Button } from "rsuite";
import TimeAgo from "timeago-react";
import { useCurrentRoom } from "../../../context/curren-room.context";
import { auth } from "../../../misc/firebase";
import PresenceDot from "../../PresenceDot";
import ProfileAvatar from "../../ProfileAvatar";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import IconBtnControl from "./IconBtnControl";
import ImgBtnModal from "./ImgBtnModal";

const renderFileMessage = (file) => {
  if (file.contentType.includes("image")) {
    return (
      <div className="height-220">
        <ImgBtnModal src={file.url} file={file.name} />
      </div>
    );
  }
  if (file.contentType.includes("audio")) {
    return (
      <audio controls>
        <source src={file.url} type="audio/mp3" />
        Your browser does not support the audio element
      </audio>
    );
  }
  return <a href={file.url}>Download [{file.name}]</a>;
};

const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const { author, createdAt, text, file, likes, likeCount } = message;
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li className={`padded mb-1 cursor-pointer `}>
      <div className="d-flex align-items-center font-weight-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <span className="ml-2"> </span>
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthorAdmin
                ? "Remove admin permission"
                : "Give admin permission"}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo datetime={createdAt} className="fornt-normal text-black-45" />
        <IconBtnControl
          {...(isLiked ? { color: "red" } : {})}
          isVisible
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible
            iconName="close"
            tooltip="Delete this message"
            onClick={() => handleDelete(message.id, file)}
          />
        )}
      </div>
      <div>
        {text && <span className="word-break-all">{text}</span>}
        {file && renderFileMessage(file)}
      </div>
    </li>
  );
};

export default MessageItem;
