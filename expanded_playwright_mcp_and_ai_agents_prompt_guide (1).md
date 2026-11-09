# Advanced Playwright MCP & AI Agents Prompt Guide

This document contains production-ready prompts for GitHub Copilot Agent mode and LLMs, covering foundational Module 8 concepts, detailed browser exploration, interactive element testing, and end-to-end automation workflows.

---

## Part 1: Comprehensive Practice Page Prompt (`testautomationpractice.blogspot.com`)

This prompt instructs GitHub Copilot Agent mode / Playwright MCP to execute and automate **all interactive web actions** available on the Playwright Practice page.

### **All-In-One Web Actions Agent Prompt:**

> "Using the Playwright MCP browser tool and GitHub Copilot Agent mode, perform a complete automation suite covering all interactive UI controls on `https://testautomationpractice.blogspot.com/p/playwrightpractice.html` and generate a robust Playwright TypeScript test file named `tests/all-actions-practice.spec.ts`:
>
> 1. **Text Inputs & Form Controls**:
>    * Locate form inputs using `getByLabel()`, `getByTestId()`, and `getByPlaceholder()`.
>    * Fill in the Email Address (`testuser@example.com`), Password (`SecurePass123!`), and Age (`28`) fields.
>    * Interact with input fields across different form sections and trigger submission clicks.
>
> 2. **Navigation & Text Locators**:
>    * Verify top navigation links ('Home', 'Products') using `getByRole('link')`.
>    * Assert visibility of key paragraph text elements using `getByText()`.
>    * Verify tooltip elements using `getByTitle()`.
>
> 3. **Mouse Actions & Hover Operations**:
>    * Perform hover actions over dropdown triggers and menu items to reveal hidden sub-menus.
>    * Scroll into view and trigger click actions on action buttons (e.g., 'Edit Profile', 'Save').
>
> 4. **Drag and Drop Actions**:
>    * Locate source draggable elements and target drop zones on the page.
>    * Perform drag-and-drop operations using `.dragTo()` and assert success text.
>
> 5. **Static & Dynamic Web Tables**:
>    * Extract row and column data from the static table (e.g., BookName, Author, Price).
>    * Parse the Dynamic Web Table to locate process names (Chrome, Firefox) and dynamically verify corresponding CPU / Memory metrics.
>
> 6. **Pagination Web Table**:
>    * Iterate through pagination controls (pages 1, 2, 3, 4).
>    * Select item checkboxes across different pages and verify their checked state.
>
> 7. **Shadow DOM & Special Elements**:
>    * Access shadow root elements and fill internal input fields.
>    * Interact with file input controls inside shadow trees.
>
> 8. **Code Generation**:
>    * Output a clean, production-ready Playwright TypeScript test file using clean `async/await` syntax, semantic locators (`getByRole`, `getByLabel`, `getByText`), and strict assertions (`expect`)."

---

## Part 2: Module 8 Core Concepts & Prompts

### 1. Playwright MCP Server Initialization & Setup
* **Concept**: Connecting and verifying the Model Context Protocol server.
* **Prompt**:
  > "Initialize the Playwright MCP server session using `@playwright/mcp@latest`. Verify that the browser automation tool is active, headless mode is configured correctly, and the agent can communicate with local ports."

### 2. Autonomous Page Navigation & Test Generation
* **Concept**: Having the AI agent browse a site and write a test script automatically.
* **Prompt**:
  > "Using the Playwright MCP browser tool, navigate to `https://testautomationpractice.blogspot.com/`. Explore the DOM, locate the date picker and text input elements, and generate a robust Playwright TypeScript test file (`tests/auto-generated.spec.ts`) using semantic locators like `getByRole` and `getByLabel`."

### 3. Edge Cases & Boundary Value Test Data Generation
* **Concept**: Generating complex test datasets using AI.
* **Prompt**:
  > "Analyze the registration form elements on `https://testautomationpractice.blogspot.com/`. Generate a parameterized test data array in TypeScript covering boundary values: empty strings, maximum length characters ($255+$ length), SQL injection payloads, special Unicode characters, and valid inputs. Implement error assertions for each negative test case."

### 4. Test Coverage Gap Analysis
* **Concept**: Finding missing test cases in an existing suite.
* **Prompt**:
  > "Review my existing test file `tests/mouse-actions.spec.ts` against the requirements for `https://testautomationpractice.blogspot.com/`. Identify missing edge cases, untested states, or missing assertions, and output the missing test blocks in TypeScript."

---

## Part 3: E-Commerce Project Prompt — SauceDemo Cart & Checkout Flow

### **End-to-End SauceDemo Agent Prompt:**

> "Using the Playwright MCP browser tool and GitHub Copilot Agent mode, perform the following end-to-end shopping workflow on `https://www.saucedemo.com/` and write a complete, production-ready Playwright TypeScript test file named `tests/saucedemo-checkout.spec.ts`:
>
> 1. **Login Phase**:
>    * Navigate to `https://www.saucedemo.com/`.
>    * Fill username with `standard_user` and password with `secret_sauce`.
>    * Click the Login button and verify redirection to the inventory page (`/inventory.html`).
>
> 2. **Shopping / Cart Phase**:
>    * Add the 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to the cart by clicking their respective 'Add to cart' buttons.
>    * Verify that the shopping cart badge displays the count '2'.
>    * Click on the shopping cart icon to navigate to the cart page.
>    * Assert that both items are present in the cart list.
>
> 3. **Checkout Phase**:
>    * Click the 'Checkout' button.
>    * Fill out the checkout information form: First Name = 'John', Last Name = 'Doe', Postal Code = '12345'.
>    * Click 'Continue' to go to the overview page.
>    * Verify the item total and tax calculations are displayed correctly.
>    * Click 'Finish' to complete the order.
>
> 4. **Validation Phase**:
>    * Assert that the success header reads 'Thank you for your order!'.
>    * Ensure the dispatch confirmation message is visible.
>    * Generate clean, asynchronous TypeScript code with proper async/await syntax and strict Playwright assertions (`expect`)."