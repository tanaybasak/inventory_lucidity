import { useSelector } from "react-redux";
import { Cart, Shop, CartX, CircleSquare } from "react-bootstrap-icons";

const AppCard: React.FC = () => {
  const { totalProducts, storeValue, outOfStocks, noOfCategories } =
    useSelector((state: any) => state.api);

  const cardsData = [
    {
      icon: <Cart width={36} height={36} />, // Cart Icon
      title: "Total Product",
      value: totalProducts,
    },
    {
      icon: <Shop width={36} height={36} />, // Store Icon
      title: "Total Store Value",
      value: storeValue,
    },
    {
      icon: <CartX width={36} height={36} />, // Cart with Cross Icon
      title: "Out of stocks",
      value: outOfStocks,
    },
    {
      icon: <CircleSquare width={36} height={36} />, // Circle Square Icon
      title: "No of Category",
      value: noOfCategories,
    },
  ];

  return (
    <div className="row g-6 mb-6">
      {cardsData.map((card, index) => (
        <div key={index} className="col-xl-3 col-sm-6 col-12 mb-2">
          <div className="card shadow border-0">
            <div className="card-body card_pad">
              <div className="row">
                <div className="col-auto">{card.icon}</div>
                <div className="col">
                  <span className="h6 font-semibold text-sm d-block mb-2">
                    {card.title}
                  </span>
                  <span className="h3 font-bold mb-0">{card.value}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppCard;
