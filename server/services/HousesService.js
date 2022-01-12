import { BadRequest } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";

class HousesService {
    async getAll() {
        const foundHouses = await dbContext.Houses.find().populate('creator', 'name')
        return foundHouses
    }

    async getById(houseId) {
        const foundHouse = await dbContext.Houses.findById(houseId).populate('creator', 'name')
        if (!foundHouse) {
            throw new BadRequest('House Not Found')
        }
        return foundHouse
    }

    async create(newHouse) {
        const createdHouse = await dbContext.Houses.create(newHouse)
        return createdHouse
    }

    async remove(houseId, creatorId) {
        const foundHouse = await this.getById(houseId)
        if (foundHouse.creatorId.toString() !== creatorId) {
            throw new BadRequest('Unauthorized Delete')
        }
        await foundHouse.remove()
        return foundHouse
    }

    async edit(houseId, editedHouse) {
        const houseToEdit = await this.getById(houseId)
        if (houseToEdit.creatorId.toString() !== editedHouse.creatorId) {
            throw new BadRequest('Edit UnAuthorized')
        }
        houseToEdit.sqft = editedHouse.sqft || houseToEdit.sqft
        houseToEdit.rooms = editedHouse.rooms || houseToEdit.rooms
        houseToEdit.baths = editedHouse.baths || houseToEdit.baths
        houseToEdit.description = editedHouse.description || houseToEdit.description



    }
}

export const housesService = new HousesService()