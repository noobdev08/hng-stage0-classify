import axios from "axios";

export async function getResponse(req, res) {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ status: "error", message: "Bad Request" });
        }

        if(typeof name !== "string") {
            return res.status(422).json({ status: "error", message: "Unprocessable Entity" });
        }

        const externalRes = await axios.get(`https://api.genderize.io?name=${name}`);
        const response = externalRes.data;

        if(response.gender === null || response.count === 0){
            return res.status(200).json({ status: "error", message: "No prediction available for the provided name" });
        }

        const data = {
            name: name,
            gender: response.gender,
            probability: response.probability,
            sample_size: response.count,
            is_confident: response.probability >= 0.7 && response.count >= 100,
            processed_at: new Date().toISOString()
        }

        res.status(200).json({ status: "success", data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": "error", "message": "Server Error" });
    }
}