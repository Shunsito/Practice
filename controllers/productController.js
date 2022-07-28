import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const { _id: id } = req.user;
    const products = await Product.find({ creator: id });
    res.status(200).json({
      msg: "fetched all products",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ msg: "hubo un error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, store } = req.body;
  const { _id: id } = req.user;

  if (!name || !price || !store) {
    res.status(400).json({ msg: "there are missing fields" });
  }
  try {
    await Product.create({
      name,
      price,
      store,
      creator: id,
    });
    res.status(201).json({ msg: "product created" });
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Could not create product");
  }
};

export const getProductId = async (req, res) => {
  const { id: productid } = req.params;
  const { _id: userid } = req.user;

  try {
    const product = await Product.findById(productid);
    if (userid.valueOf() != product.creator.valueOf())
      res.status(403).json({ msg: " no eres el creador" });

    res.status(200).json({ msg: "producto encontrado", data: product });
  } catch (error) {
    res.status(401).send("Could not fetch product");
  }
};

export const editProduct = async (req, res) => {
  const { name, price } = req.body;
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { name, price },
      { new: true }
    );
    res.status(200).json({ msg: "se ha actualizado su producto" });
  } catch (error) {
    res.status(400).json({ msg: "no se pudo actualizar su producto" });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const productDeleted = await Product.findByIdAndDelete({ _id: productId });

    if (!productDeleted) {
      res.status(400).json({ msg: "no se encontro el producto" });
    }
    res.status(200).json({ msg: "producto eliminado" });
  } catch (erro) {
    res.status(500).json({ msg: "no se puede borrar" });
  }
};
