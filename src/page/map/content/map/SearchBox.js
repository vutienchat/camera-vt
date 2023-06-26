import React, { Component } from "react";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    const request = {
      query: "60 Hoàng Quốc Việt, Hà Nội",
      fields: ["name", "geometry"],
    };

    this.searchBox = new mapApi.places.PlacesService(map);
    this.searchBox.findPlaceFromQuery(request, (results, status) => {
      if (status === "OK") {
        console.log(results[0].geometry);
        console.log("name", results[0].name);
        console.log("tọa độ");
        console.log(results[0].geometry.viewport.Ha);
        console.log(results[0].geometry.viewport.Ua);
      }
    });
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchBox);
  }

  clearSearchBox() {
    this.searchInput.value = "";
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "20px",
        }}
      >
        {/* <input
          ref={(ref) => {
            this.searchInput = ref;
          }}
          value={"60 Hoang Quóc Việt"}
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Enter a location"
        /> */}
      </div>
    );
  }
}

export default SearchBox;
