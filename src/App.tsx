import React, { FC, useState } from "react";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import styles from "./App.module.css";
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalenderIcon from "../src/components/assets/CalenderIcon.svg";
import CalenderPlusIcon from "../src/components/assets/calenderplus.svg";
import ChevronLeft from "../src/components/assets/chevron-left.svg";
import ChevronRight from "../src/components/assets/chevron-right.svg";

interface DateTimeBlockProps {

}

const App: FC<DateTimeBlockProps> = () => {
  const [startDate, setStartDate] = useState<Date | null>(null); // The selected date (updated on Apply)
  const [tempDate, setTempDate] = useState<Date | null>(null); // The temporary date selected by user
  const [isPopperOpen, setIsPopperOpen] = useState(false); // To toggle the date picker visibility

  const isDateTimePreference = false

  // Custom header for the date picker
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 24px 12px 24px"
    >
      <Button
        variant="unstyled"
        onClick={(e) => handleMonthNavigation(e, decreaseMonth)}
        disabled={prevMonthButtonDisabled}
        className={styles["custom-header__navigation-btn"]}
      >
        <Image
          src={ChevronLeft}
          alt="chevron-left"
          className={styles["custom-header__navigation-icon"]}
        />
      </Button>
      <Text className={styles["custom-header__month"]}>
        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
      </Text>
      <Button
        variant="unstyled"
        onClick={(e) => handleMonthNavigation(e, increaseMonth)}
        disabled={nextMonthButtonDisabled}
        className={styles["custom-header__navigation-btn"]}
      >
        <Image
          src={ChevronRight}
          alt="chevron-right"
          className={styles["custom-header__navigation-icon"]}
        />
      </Button>
    </Box>
  );

  const handleMonthNavigation = (
    e: React.MouseEvent<HTMLButtonElement>,
    navigate: () => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate();
  };

  const handleApply = () => {
    if (tempDate) {
      setStartDate(tempDate); // Set the selected date after applying
    }
    setIsPopperOpen(false);
  };

  const handleClear = () => {
    setIsPopperOpen(false);
  };

  const handleButtonAction = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const calendarContainer = ({ children }: { children: React.ReactNode }) => (
    <Box className={styles["custom-popper"]}>
      {children}
      {/* Footer buttons: Cancel and Apply */}
      <Box className={styles["datepicker-buttons"]}>
        <Button
          onClick={(e) => handleButtonAction(e, handleClear)}
          variant="unstyled"
          className={styles["foolter-btn__clear"]}
        >
          Cancel
        </Button>
        <Button
          onClick={(e) => handleButtonAction(e, handleApply)}
          variant="unstyled"
          className={styles["foolter-btn__apply"]}
          isDisabled={!tempDate} // Disable Apply button if no date is selected
        >
          Apply
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      className={styles["custom-datepicker-wrapper"]}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsPopperOpen(true);
      }}
    >
      <ReactDatePicker
        className={styles["custom-datepicker"]}
        placeholderText={
          isDateTimePreference ? "DD/MM/YYYY HH:MM" : "DD/MM/YYYY"
        }
        dateFormat={isDateTimePreference ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
        showPopperArrow={false}
        calendarStartDay={1} // Start from Monday
        selected={startDate} // Show the actual selected date
        onChange={(date: Date | null) => {
          if (startDate) {
            setTempDate(startDate);
          }
          setTempDate(date);
        }} // Update temp date
        isClearable={false}
        renderCustomHeader={renderCustomHeader}
        calendarContainer={calendarContainer}
        shouldCloseOnSelect={false} // Prevent popper from closing on select
        open={isPopperOpen}
        minDate={new Date()} // Disallow past dates
        onClickOutside={() => {
          setTempDate(startDate); // Reset tempDate to the applied startDate if the popper is closed without applying
          setIsPopperOpen(false);
        }} // Close popper if clicking outside
      />
      <Box className={styles["icon-wrapper"]}>
        <Image
          src={isDateTimePreference ? CalenderPlusIcon : CalenderIcon}
          alt="calendar-icon"
          className={styles["custom-icon"]}
        />
      </Box>
    </Box>
  );
};

export default App;
