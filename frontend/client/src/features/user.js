import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'





// login action creator
export const login = createAsyncThunk(
	'users/login',
	async ({ email, password }, thunkAPI) => {
		const body = JSON.stringify({
			email,
			password,
		});

		try {
			const res = await fetch('/api/users/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
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
	}
);


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

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
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
    .addCase(register.rejected, state => {
      state.loading = false;
    })
  }
})

export const { resetRegistered } = userSlice.actions
export default userSlice.reducer
