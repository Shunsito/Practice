import Purchase from "../models/Puchase.js";
import Product from "../models/Product.js";
import ProductPurchase from "../models/ProductPurchase.js";

export const getPurchases = async (req, res) => {
  const userId = req.user._id;

  try {
    const purchases = await Purchase.find({ creator: userId });

    const purchasesMapped = await Promise.all(
      purchases.map(async (purchase) => {
        return {
          creator: purchase.creator,
          date: purchase.date,
          _id: purchase._id,
          products: await ProductPurchase.find({ purchase: purchase._id }),
        };
      })
    );

    const purchasesMappedWithProducts = await Promise.all(
      purchasesMapped.map(async (purchase) => {
        return {
          creator: purchase.creator,
          date: purchase.date,
          _id: purchase._id,
          products: await Promise.all(
            purchase.products.map(async (productPurchase) => {
              const product = await Product.findById(productPurchase.productId);
              return {
                _id: product._id,
                name: product.name,
                price: product.price,
                store: product.store,
                creator: product.creator,
                quantity: productPurchase.quantity,
              };
            })
          ),
        };
      })
    );
    res
      .status(200)
      .json({ msg: "purchase found", data: purchasesMappedWithProducts });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

export const getPurchaseById = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    const purchase = await Purchase.findById(purchaseId);
    const productsPurchased = await ProductPurchase.find({
      purchase: purchaseId,
    });
    let productsData;
    if (productsPurchased.length > 0) {
      productsData = await Promise.all(
        productsPurchased.map(async (product) => {
          const productData = await Product.findById(product.productId);
          return {
            _id: productData._id,
            name: productData.name,
            price: productData.price,
            store: productData.store,
            creator: productData.creator,
            quantity: product.quantity,
          };
        })
      );
    }
    const purchasesMappedWithProducts = {
      ...purchase.toObject(),
      products: productsData,
    };

    res
      .status(200)
      .json({ msg: "compra encontrada", data: purchasesMappedWithProducts });
  } catch (error) {
    res.status(500).json({ msg: "no se puede tomar la compra" });
  }
};

export const createPurchase = async (req, res) => {
  const userId = req.user._id;
  const { products } = req.body;
  try {
    const purchase = await Purchase.create({
      creator: userId,
    });

    await ProductPurchase.create(
      products.map((product) => {
        return { ...product, purchase: purchase._id };
      })
    );

    res.status(200).json({ msg: "Compra creada" });
  } catch (error) {
    res.status(500).json({ msg: "no se puede crear su compra" });
  }
};

export const deletePurchase = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    const purchaseDeleted = await Purchase.findByIdAndDelete({
      _id: purchaseId,
    });
    if (!purchaseDeleted) {
      res.status(400).json({ msg: "no se encontro la compra" });
    }
    await ProductPurchase.deleteMany({ purchase: purchaseId });
    res.status(200).json({ msg: "se elimino su compra" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "no se puede borrar" });
  }
};
