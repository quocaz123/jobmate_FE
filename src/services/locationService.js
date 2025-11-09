import httpClient from "../configurations/httpClient";
import { USER } from "../configurations/configuration";
import { getUserInfo } from "./userService";

// API mới từ BE: getAutoLocation và updateLocation
export const getAutoLocation = async () => {
    try {
        const res = await httpClient.get(USER.AUTO_COMPLETE_LOCATION);
        const data = res?.data?.data || res?.data || {};
        return {
            latitude: data?.latitude ?? data?.lat,
            longitude: data?.longitude ?? data?.lng ?? data?.lon,
            city: data?.city,
            address: data?.address,
        };
    } catch (err) {
        console.error('Lỗi khi lấy vị trí tự động:', err);
        return null;
    }
};

export const updateLocation = async (request) => {
    try {
        const res = await httpClient.put(USER.UPDATE_USER, request);
        return res?.data?.data || res?.data;
    } catch (err) {
        console.error('Lỗi khi cập nhật vị trí:', err);
        throw err;
    }
};

// Khởi tạo vị trí người dùng: ưu tiên GPS, thất bại thì fallback qua IP
export const initUserLocation = async () => {
    try {
        const meRes = await getUserInfo();
        const me = meRes?.data?.data || meRes?.data || {};

        const { address, latitude, longitude } = me;
        console.log("address", address);
        console.log("latitude", latitude);
        console.log("longitude", longitude);


        if(address && latitude && longitude) {
            console.log("Người dùng đã có địa chỉ và tọa độ:", address);
            return { latitude, longitude, source: "profile" };
        }

        const getPosition = () =>
            new Promise((resolve, reject) => {
                if (!navigator?.geolocation) return reject(new Error("Geolocation not supported"));
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve(pos),
                    (err) => reject(err),
                    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
                );
            });

        try {
            const pos = await getPosition();
            const { latitude: lat, longitude: lng } = pos.coords || {};

            if (lat != null && lng != null) {
                await updateLocation({ latitude: lat, longitude: lng });
                console.log("Đã lưu vị trí GPS mới cho người dùng");
                return { latitude: lat, longitude: lng, source: "gps" };
            }
            throw new Error("No coords from geolocation");
        } catch (geoErr) {
            console.warn("Không thể lấy vị trí GPS:", geoErr?.message || geoErr);

            try {
                const ipData = await getAutoLocation();
                if (ipData?.latitude && ipData?.longitude) {
                    await updateLocation({
                        latitude: ipData.latitude,
                        longitude: ipData.longitude,
                        address: ipData.city || ipData.address,
                    });
                    console.log("Vị trí gần đúng qua IP:", ipData);
                    return {
                        latitude: ipData.latitude,
                        longitude: ipData.longitude,
                        source: "ip",
                        raw: ipData
                    };
                }
            } catch (ipErr) {
                console.error("Fallback qua IP thất bại:", ipErr?.message || ipErr);
                return null;
            }
        }
    } catch (err) {
        console.error("initUserLocation lỗi:", err?.message || err);
        return null;
    }
};

