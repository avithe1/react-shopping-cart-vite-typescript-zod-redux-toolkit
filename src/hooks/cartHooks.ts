import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();