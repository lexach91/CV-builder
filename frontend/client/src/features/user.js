import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


// get user action creator
const getUser = createAsyncThunk('auth/user', async (_, thunkAPI) => {
	try {
		const response = await fetch('/api/auth/user', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		});

		const data = await response.json();

		if (response.status === 200) {
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
      // call to 5000 -  hit express route
			const response = await fetch(`/api/auth/register`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			});

			const data = await response.json();
      console.log('after fetching data');
      console.log(data);
			if (response.status === 201) {
        console.log("we are in the 201")
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
export const login = createAsyncThunk('auth/login', async ( {email, password}, thunkAPI) => {
	const body = JSON.stringify({
		email,
		password,
	});
	try {
		const response = await fetch(`/api/auth/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body
		});

		const data = await response.json();

		if (response.status === 200) {
			const { dispatch } = thunkAPI;
			dispatch(getUser());
			return data;
		} else {
			return thunkAPI.rejectWithValue(data);
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

// verification action creator
export const checkAuth = createAsyncThunk('auth/verify', async (_, thunkAPI) => {
  try {
    const res = await fetch('/api/auth/verify', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      const { dispatch } = thunkAPI;

      dispatch(getUser());

      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
})

// Logout action creator
export const logout = createAsyncThunk(
	'auth/logout',
  // no arguments in this case
	async (_, thunkAPI) => {

		try {
			const res = await fetch('/api/auth/logout', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});

			const data = await res.json();

			if (res.status === 200) {

				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);


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
    }
  },
  // accept other types outside of the slice
  extraReducers: builder => {
    builder
    .addCase(register.pending, state => {
      state.loading = true;
    })
    .addCase(register.fulfilled, state => {
      state.loading = false;
      state.registered = true;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    })
    .addCase(login.pending, state => {
      state.loading = true;
    })
    .addCase(login.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = true;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    })
    .addCase(getUser.pending, state => {
      state.loading = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(getUser.rejected, state => {
      state.loading = false;
    })
    .addCase(checkAuth.pending, state => {
      state.loading = true;
    })
    .addCase(checkAuth.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = true;
    })
    .addCase(checkAuth.rejected, state => {
      state.loading = false;
    })
    .addCase(logout.pending, state => {
      state.loading = true;
    })
    .addCase(logout.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase(logout.rejected, state => {
      state.loading = false;
    })
  }
})

export const { resetRegistered } = userSlice.actions
export default userSlice.reducer
