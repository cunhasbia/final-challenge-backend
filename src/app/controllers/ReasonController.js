/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import Reason from '../models/Reason';
import SaleReturn from '../models/SaleReturn';

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
        include: [
          {
            model: SaleReturn,
            as: 'sale_returns',
            attributes: ['id', 'description'],
          },
        ],
        where,
        limit,
        offset: limit * (page - 1),
      });

      return response.json(reason);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const parsed = Number.parseInt(id);

      if (Number.isNaN(parsed)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const reason = await Reason.findByPk(parsed);

      if (!reason) {
        return response.status(404).json({ message: 'Reason not found' });
      }

      return response.json(reason);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { description } = request.body;

      const reason = await Reason.create({
        description,
      });

      return response.json(reason);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { description } = request.body;

      const parsed = Number.parseInt(id);

      if (Number.isNaN(parsed)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const reason = await Reason.findByPk(parsed);

      if (!reason) {
        return response.status(404).json({ message: 'Reason not found' });
      }

      if (!reason) {
        return response.status(404).json({ message: 'Description Required' });
      }
      reason.description = description;
      reason.save();

      return response.json();
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const parsed = Number.parseInt(id);

      if (Number.isNaN(parsed)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const reason = await Reason.findByPk(parsed);

      if (!reason) {
        return response.status(404).json({ message: 'Reason not found' });
      }
      await reason.destroy();

      return response.json();
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new ReasonController();
