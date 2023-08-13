import React, { useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUser from '@/hooks/useUser';
import { User } from '@/services/auth';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  if (!user) {
    navigate('/login');
  }
  const [userInfo, setUserInfo] = useState<User>(user);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Box component={Paper}>
      <div className="p-8 w-1/2">
        <div className="mb-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <TextField
            label="First Name"
            variant="outlined"
            value={userInfo.firstName}
            disabled={!isEditing}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, firstName: e.target.value }))
            }
            className="mb-4"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={userInfo.lastName}
            disabled={!isEditing}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))
            }
            className="mb-4"
          />
          <TextField
            label="Email"
            variant="outlined"
            value={userInfo.email}
            disabled={!isEditing}
            onChange={(e) =>
              setUserInfo((prev) => ({ ...prev, email: e.target.value }))
            }
            fullWidth
            className="mb-4"
          />
          <div className="flex justify-end">
            {!isEditing ? (
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <TextField
            type="password"
            label="Current Password"
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          <TextField
            type="password"
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          <div className="flex justify-end">
            <Button variant="contained" color="primary">
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Profile;
