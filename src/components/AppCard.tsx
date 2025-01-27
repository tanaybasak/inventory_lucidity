import { useSelector } from "react-redux";
import {Cart, Shop, CartX, CircleSquare} from 'react-bootstrap-icons';
const AppCard: React.FC = () => {
  const { totalProducts, storeValue, outOfStocks, noOfCategories } =
    useSelector((state: any) => state.api);
  return (
    <div className="row g-6 mb-6">
      <div className="col-xl-3 col-sm-6 col-12 mb-2">
        <div className="card shadow border-0">
          <div className="card-body card_pad">
            <div className="row">
              <div className="col-auto">
              <Cart width={36} height={36} /> {/* Cart Icon */}

              </div>
              <div className="col">
                <span className="h6 font-semibold text-sm d-block mb-2">
                  Total Product
                </span>
                <span className="h3 font-bold mb-0">{totalProducts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 mb-2">
        <div className="card shadow border-0">
          <div className="card-body card_pad">
            <div className="row">
              <div className="col-auto">
              <Shop width={36} height={36} /> {/* Store Icon */}

              </div>
              <div className="col">
                <span className="h6 font-semibold text-sm d-block mb-2">
                  Total Store Value
                </span>
                <span className="h3 font-bold mb-0">{storeValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 mb-2">
        <div className="card shadow border-0">
          <div className="card-body card_pad">
            <div className="row">
              <div className="col-auto">
              <CartX width={36} height={36} /> {/* Cart with Cross Icon */}

              </div>
              <div className="col">
                <span className="h6 font-semibold text-sm d-block mb-2">
                  Out of stocks
                </span>
                <span className="h3 font-bold mb-0">{outOfStocks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 mb-2">
        <div className="card shadow border-0">
          <div className="card-body card_pad">
            <div className="row">
              <div className="col-auto">
              <CircleSquare width={36} height={36} /> {/* Circle Square Icon */}

              </div>
              <div className="col">
                <span className="h6 font-semibold text-sm d-block mb-2">
                  No of Category
                </span>
                <span className="h3 font-bold mb-0">{noOfCategories}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
