import React from 'react';
import PropTypes from "prop-types";

const UserLoginBox = (props) => {
    return (
            <li>
              <div className="styled-select slate">
                <form>
                  <select
                    defaultValue=""
                    id="navSelect"
                    onChange={event => {
                      props.changeUser(event.target.value);
                    }}
                  >
                    <option value="">
                      {props.user ? props.user : "Log In"}
                    </option>
                    {props.users.length
                      ? props.users.map(user => {
                          return (
                            <option key={user._id} value={user._id}>
                              {user.username}
                            </option>
                          );
                        })
                      : "Loading Users..."}
                  </select>
                </form>
              </div>
            </li>
    );
};

UserLoginBox.propTypes = {
  changeUser: PropTypes.func.isRequired,
  users: PropTypes.srray,
  user: PropTypes.string,
};


export default UserLoginBox;