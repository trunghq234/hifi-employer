import Avatar from "@/components/commons/Avatar";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";

const Title: React.FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 185 }}>
        <Avatar
          src={user?.logo}
          text={user?.name}
          style={{
            width: "100%",
            maxWidth: 40,
            marginRight: 4,
          }}
        />
        <p
          style={{
            fontSize: "16px",
            marginBottom: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
          {user?.name}
        </p>
      </div>
    </div>
  );
};

export default Title;
