import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial Conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const orderButton = screen.getByRole("button", { name: /place order/i });
  expect(orderButton).toBeDisabled();
});
test("Checkbox disables button on first click and enables on second click", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const orderButton = screen.getByRole("button", { name: /place order/i });

  await user.click(checkbox);
  expect(orderButton).toBeEnabled();

  await user.click(checkbox);
  expect(orderButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
