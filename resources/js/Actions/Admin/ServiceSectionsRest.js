import BasicRest from "../BasicRest";
import { Fetch } from "sode-extend-react";

class ServiceSectionsRest extends BasicRest {
    path = 'admin/service-sections'

    list = async (params) => {
        // Construir query string manualmente
        const queryString = params ? new URLSearchParams(params).toString() : '';
        const url = `/api/${this.path}${queryString ? `?${queryString}` : ''}`;
        
        const { status, result } = await Fetch(url, {
            method: "GET",
        });
        
        if (!status) return null;
        return result?.data ?? result;
    }

    save = async (data) => {
        const { status, result } = await Fetch(`/api/${this.path}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!status) return null;
        return result?.data ?? result;
    }

    reorder = async (data) => {
        const { status, result } = await Fetch(`/api/${this.path}/reorder`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        
        if (!status) return null;
        return result?.data ?? true;
    }
}

export default ServiceSectionsRest
