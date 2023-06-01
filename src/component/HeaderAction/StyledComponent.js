import styled from "styled-components";

export const StyledComponent = styled.div`
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  .item-field {
    font-family: Sarabun;
    font-size: 16px;
    font-weight: 500;
    .field-name {
      font-family: Sarabun;
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
    .MuiOutlinedInput-input {
      padding: 0 14px 0 0;
      font-size: 14px;
    }
    .MuiOutlinedInput-adornedStart {
      height: 48px;
    }
    .MuiTextField-root {
      width: 400px;
    }
    .MuiOutlinedInput-root {
      &:hover {
        border: unset;
      }
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid #d3d3d3;
      }
    }
    .item-field-title {
      font-weight: bold;
    }
    .item-button {
      width: 48px;
      height: 48px;
      border: 1px solid #d3d3d3;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .datePicker {
      input {
        width: 200px;
        height: 48px;
        border: 1px solid #d3d3d3;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
      }
    }
    .react-datepicker__day,
    .react-datepicker__day-name {
      padding: 10px;
    }
    .react-datepicker__day {
      border-radius: 99px;
    }
    .react-datepicker__day--in-range {
      background: #ec1b2e;
    }
    .react-datepicker__day--keyboard-selected {
      background: #ff99a2;
    }
    .react-datepicker__day--in-selecting-range: not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range){
        background: #FFE4E6;
      }
    );
  }
  .select-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .MuiSelect-select {
    height: 48px;
    min-width: 200px;
  }

  //custom select
  .select-wrapper {
    width: 200px;
    border: 1px solid #d3d3d3;
    padding: 0 14px 0 20px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    height: 48px;
  }

  .custom-select {
    position: relative;
  }
  .select-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .type-value {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .option-box {
    position: absolute;
    width: calc(100% - 20px);
    max-height: 300px;
    overflow: auto;
    top: calc(100% + 10px);
    left: 0;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    padding: 10px;
    z-index: 20;
    .MuiTextField-root {
      width: 100%;
    }
    .search {
      margin-bottom: 4px;
    }
    .list {
      padding: 0;
      flex-wrap: wrap;
      // height: 250px;
      overflow: auto;
      .list-item {
        padding: 0 16px;
        width: 100%;
        justify-content: space-between;
        .item {
          justify-content: space-between;
          width: 100%;
          margin: 0;
        }
      }
    }
  }
`;
