import React, { useState } from "react"
import ProfilePhoto from "./basic-tab/profile-photo/profile-photo"
import Basic from "./basic-tab/basic/basic"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Paper from "@material-ui/core/Paper"
import ChangePassword from "./change-password/change-password"
import CloseAccount from "./close-account/close-account"
import "./profile-tabs.scss"
import ChangeTheme from "./change-theme/change-theme"
export function ProfileTabs({ url, onUploadProfilePhoto, user }) {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="profile-tabs">
      <Paper
        style={{
          flexGrow: 1,
          marginBottom: "30px",
        }}
        square
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="All Issues"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={"Personal Info"} />
          <Tab label={"Change Password"} />
          <Tab label={"Change Theme"} />
          <Tab label={"Close Account"} />
        </Tabs>
      </Paper>

      {value === 0 && (
        <div className="basic-profile">
          <div className="profile-photo">
            <ProfilePhoto
              url={url}
              onUploadProfilePhoto={onUploadProfilePhoto}
            />
          </div>
          {user && (
            <div className="basic">
              <Basic
                email={user?.email}
                fullName={user?.fullName}
                githubProfile={user?.githubProfile ?? ""}
                twitterProfile={user?.twitterProfile ?? ""}
                facebookProfile={user?.facebookProfile ?? ""}
                redditProfile={user?.redditProfile ?? ""}
                bio={user?.bio ?? ""}
                userId={user?.userId ?? ""}
              />
            </div>
          )}
        </div>
      )}

      {value === 1 && (
        <div className="change-password">
          <ChangePassword userId={user?.userId ?? ""} />
        </div>
      )}

      {value === 2 && (
        <div className="change-theme">
          <ChangeTheme userId={user?.userId ?? ""} />
        </div>
      )}

      {value === 3 && (
        <div className="close-account">
          <CloseAccount userId={user?.userId ?? ""} />
        </div>
      )}
    </div>
  )
}
