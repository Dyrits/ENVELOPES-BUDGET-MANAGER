const database = require("../config/database");
const { create, find, remove } = require("../helpers/envelopes");

// @desc		Retrieves all the envelopes
// @route		GET /api/v1/envelopes
exports.retrieve = async (request, response) => {
    try { response.status(200).send(database); }
    catch (error) {
        console.error(error);
        response.status(400).send(error);
    }
};

// @desc		Creates a new envelope
// @route		POST /api/v1/envelopes
exports.create = async (request, response) => {
    try {
        const {title, budget} = request.body;
        const id = create(database);
        const envelope = {
            id,
            title,
            budget,
        };
        database.push(envelope);
        response.status(201).send(envelope);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
};

// @desc		Finds an envelope by its identifier
// @route		GET /api/v1/envelopes/:id
exports.find = async (request, response) => {
    try {
        const { id } = request.params;
        const envelope = find(database, id);
        return response.status(envelope ? 200 : 400).send(envelope || { message: "The envelope cannot be found!" });
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
};

// @desc		Updates an existing envelope
// @route		PUT /api/v1/envelopes/:id
exports.update = async (request, response) => {
    try {
        const { title, budget } = request.body;
        const { id } = request.params;
        let envelope = find(database, id);
        if (!envelope) {
            return response.status(404).send({ message: "The envelope cannot be found!" });
        }
        envelope.title = title;
        envelope.budget = budget;
        response.status(201).send(database);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
};

// @desc		Deletes an individual envelope
// @route		DELETE /api/v1/envelopes/:id
exports.remove = async (request, response) => {
    try {
        const {id} = request.params;
        const envelope = find(database, id);
        if (!envelope) {
            return response.status(404).send({ message: "The envelope cannot be found!" });
        }
        let envelopes = remove(database, id);
        return response.status(204).send(envelopes);
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
};

// @desc		Transfers budget from one envelope to another
// @route		POST /api/v1/envelopes/{from}/transfer/{to}
exports.transfer = async (request, response) => {
    try {
        const { from, to } = request.params;
        if (from === to) {
            return response.status(400).send({ message: "The envelopes cannot be the same!" });
        }
        const { amount } = request.body
        if (amount <= 0) {
            return response.status(400).send({ message: "The amount must be greater than zero!" });
        }
        const origin = find(database, from);
        const destination = find(database, to);
        if (!origin || !destination) {
            return response.status(404).send({ message: "At least one of the envelope cannot be found!" });
        }
        if (origin.budget < amount) {
            return response.status(400).send({ message: "The amount to transfer exceeds the budget of the envelope." })
        }
        origin.budget -= amount;
        destination.budget += amount;
        return response.status(201).send({ origin, destination});
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
}