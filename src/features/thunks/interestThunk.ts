import { FETCH_INTEREST } from "@core/constant/constants";
import { ServiceContainer } from "@core/data/service-container/serviceContainer";
import { Article } from "@core/models/article";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isSuccess } from "@utils/isSuccess";
import { Failure } from "src/types/result";

export const fetchInterest = createAsyncThunk<Article[], string, { rejectValue: Failure }>(
  FETCH_INTEREST,
  async (selectedStory: string, thunkAPI) => {
    const result = await ServiceContainer.homeRepo.fetchSelectedStoryArticles(selectedStory);
    if (isSuccess(result)) {
      return result.data;
    } else {
      return thunkAPI.rejectWithValue(result);
    }
  },
);