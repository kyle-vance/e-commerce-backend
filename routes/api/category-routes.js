const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCatData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCatData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const idCatData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!idCatData) {
      res.status(404).json({ message: 'No catergory that matches this ID.' });
      return;
    }

    res.status(200).json(idCatData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCatData = await Category.create(req.body);
    res.status(200).json(newCatData);
  }
  catch (err) {
    res.status(400).json(err.message);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((data) => {
    res.json(data);
  })
  .catch((err) => res.json(err.message));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCatData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delCatData) {
      res.status(404).json({ message: 'No catergory that matches this ID.' });
      return;
    }

    res.status(200).json(delCatData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
