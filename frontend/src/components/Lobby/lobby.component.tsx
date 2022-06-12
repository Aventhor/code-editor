import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Panel } from "rsuite";
import { ConnectForm } from "./ConnectForm/connect-form.component";
import { ConnectFormSubmitHandler } from "./ConnectForm/connect-form.types";
import { LobbyTabKey } from "./lobby.enums";
import { NewCodeForm } from "./NewCodeForm/new-code-form.component";
import { NewCodeFormSubmitHandler } from "./NewCodeForm/new-code-form.types";

export const Lobby: FunctionComponent = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<LobbyTabKey>(LobbyTabKey.CONNECT);

  const handleConnect: ConnectFormSubmitHandler = (values) => {
    navigate(`/code?=${values.key}`);
  };

  const handleCreate: NewCodeFormSubmitHandler = (values) => {
    navigate(`/code`, { state: values });
  };

  return (
    <Panel header="Lobby" bodyFill>
      <Nav activeKey={tab} onSelect={setTab}>
        <Nav.Item eventKey={LobbyTabKey.CONNECT}>Подключится</Nav.Item>
        <Nav.Item eventKey={LobbyTabKey.NEW}>Создать</Nav.Item>
      </Nav>

      {tab === LobbyTabKey.CONNECT && <ConnectForm onSubmit={handleConnect} />}

      {tab === LobbyTabKey.NEW && <NewCodeForm onSubmit={handleCreate} />}
    </Panel>
  );
};
