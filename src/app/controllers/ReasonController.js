/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import Reason from '../models/Reason';

class ReasonController {
  async index(request, response) {
    try {
      const { page, limit, description } = request.query;
      const where = {};

      if (!page || !limit) {
        return response.status(400).json({ message: 'Invalid params' });
      }

      if (description) {
        where.description = description;
      }

      const reason = await Reason.findAndCountAll({
        attributes: ['id', 'description'],
        where,
        limit,
        offset: limit * (page - 1),
      });

      return response.json(reason);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new ReasonController();
