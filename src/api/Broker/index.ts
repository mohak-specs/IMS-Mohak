import axios from "axios";
import { IBroker, IBrokerPostType, AxiosReturnType } from "../../types";

export const getBrokers = async (by: string) => {
    try{
        const { data:brokers } = await axios.get<AxiosReturnType<IBroker[]>>(`firms?firmType=broker&${by}`);
        return brokers;
    }catch(err){
        throw err;
    }

}

export const getBroker = async (id: string) => {
    try {
        const {data:broker} = await axios.get<AxiosReturnType<IBroker>>(`firms/${id}`);
        return broker;
    } catch (error) {
        throw error
    }
}

export const createBroker = async (data: IBrokerPostType) => {
    try{
        const {data: broker} = await axios.post<AxiosReturnType<IBroker>>('firms?firmType=broker', data);
        return broker;
    }catch(error){
        throw error
    }
}

export const updateBroker = async (id: string, data: IBrokerPostType) => {
    try{
        const {data: broker} = await axios.put<IBroker>(`firms/${id}`, data);
        return broker;
    }catch(error){
        throw error
    }
}

export const deleteBroker = async (id: string) => {
    try {
        const {data: broker} = await axios.delete<IBroker>(`firms/${id}`);
        return broker;
    } catch (error) {
        throw error
    }
}