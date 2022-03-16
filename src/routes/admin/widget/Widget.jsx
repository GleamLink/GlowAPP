import { KeyboardArrowUp } from "@mui/icons-material/"
import "./_widget.scss"

function Widget() {
    return (
        <div className="widget">
          <div className="left">
            <span className="title">USERS</span>
            <span className="counter">526332</span>
            <span className="link">See all users</span>
          </div>
          <div className="right">
            <div className="percentage positive">
              <KeyboardArrowUp />
              5 %
            </div>
            icon
          </div>
        </div>
      );
}

export default Widget;