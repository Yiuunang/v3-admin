import { get } from "@/http/request";
import { IProject } from "./type";

export const getProjectList = async () => {
    return get<IProject[]>({}, '/projects')
}