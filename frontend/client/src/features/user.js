import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


// get user action creator
export const getUser = createAsyncThunk('auth/user', async (_, thunkAPI) => {
  try {
    const res = await axios.get('auth/user');
    const data = await res.data;
    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});


// register action creator
export const register = createAsyncThunk(
  'auth/register',
  async ({ first_name, last_name, birthday, country, email, password, password_confirm }, thunkAPI) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      birthday,
      country,
      email,
      password,
      password_confirm,
    });

    try {
      const res = await axios.post('auth/register', body);
      const data = await res.data;
      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


// login action creator
export const login = createAsyncThunk(
  'auth/login',
  async ( {email, password}, thunkAPI) => {
	const body = JSON.stringify({
		email,
		password,
	});

	try {
		const response = await axios.post('auth/login', body);
		const data = await response.data;
		if (response.status === 200) {
			const { dispatch } = thunkAPI;
			dispatch(getUser());
      // console.log('data', data);
			return data;
		} else {
      console.log('something went wrong1')
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
    console.log('something went wrong2')
    console.log(err)
		return thunkAPI.rejectWithValue("Something went wrong");
	}
});

// verification action creator
export const checkAuth = createAsyncThunk('auth/verify', async (_, thunkAPI) => {
  try {
    const response = await axios.get('auth/verify');
    const data = await response.data;

    if (response.status === 200) {
      const { dispatch } = thunkAPI;
      dispatch(getUser());
      return data;
    } else {
      console.log(response);
      // const { dispatch } = thunkAPI;
      // dispatch(refreshToken());
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue("Something went wrong");
  }
})

// Logout action creator
export const logout = createAsyncThunk(
	'auth/logout',
  // no arguments in this case
	async (_, thunkAPI) => {

		try {
			const response = await axios.get('auth/logout');
			const data = await response.data;

			if (response.status === 200) {

				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);


// refresh token action creator
export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const res = await axios.post('auth/refresh');
      const data = await res.data;

      if (res.status === 200) {
        const { dispatch } = thunkAPI;
        dispatch(checkAuth());
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)



const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
  errors: null,
  messages: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false
    },
    resetMessages: (state) => {
      state.messages = null
    },
    resetErrors: (state) => {
      state.errors = null
    },
    setMessages: (state, message) => {
      state.messages = message.payload;
    },
    setErrors: (state, error) => {
      state.errors = error.payload;
    },
  },
  // accept other types outside of the slice
  extraReducers: builder => {
    builder
    .addCase(register.pending, state => {
      state.loading = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(register.fulfilled, state => {
      state.loading = false;
      state.registered = true;
      state.errors = null;
      state.messages = "You have successfully registered. Please login to continue."
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload.error;
      state.messages = null;
    })
    .addCase(login.pending, state => {
      state.loading = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(login.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = true;
      state.errors = null;
      state.messages = "You have successfully logged in."
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
      state.messages = null;
      state.isAuthenticated = false;
    })
    .addCase(getUser.pending, state => {
      state.loading = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(getUser.rejected, state => {
      state.loading = false;
      state.isAuthenticated = false;
      // state.errors = "Session expired. Please login to continue.";
      state.messages = null;
    })
    .addCase(checkAuth.pending, state => {
      state.loading = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(checkAuth.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(checkAuth.rejected, state => {
      state.loading = false;
      state.isAuthenticated = false;
      // state.errors = "Session expired. Please login to continue.";
    })
    .addCase(logout.pending, state => {
      state.loading = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(logout.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.errors = null;
      state.messages = "You have successfully logged out.";
    })
    .addCase(logout.rejected, state => {
      state.loading = false;
    })
    .addCase(refreshToken.pending, state => {
      state.loading = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(refreshToken.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = true;
      state.errors = null;
      state.messages = null;
    })
    .addCase(refreshToken.rejected, state => {
      state.loading = false;
      state.isAuthenticated = false;
      state.errors = "Session expired. Please login to continue.";
    })
  }
})

export const { resetRegistered, resetErrors, resetMessages, setErrors, setMessages } = userSlice.actions
export default userSlice.reducer
