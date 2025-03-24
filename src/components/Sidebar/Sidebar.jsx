import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../../src/assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevprompt, callit, recentPrompt, setRecentPrompt } =
    useContext(Context);
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => {
            setExtended((prev) => !prev);
          }}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {/* console.log(prevprompt); */}
            {prevprompt?.map((item, index) => (
              <div key={index} className="recent-entry">
                <img src={assets.message_icon} alt="message" />
                <p>{item.slice(0,15)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-items recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-items recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-items recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;