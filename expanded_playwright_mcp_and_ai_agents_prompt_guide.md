# Advanced Playwright MCP & AI Agents Prompt Guide

This document contains production-ready prompts for GitHub Copilot Agent mode and LLMs, covering foundational Module 8 concepts, detailed browser exploration, and an end-to-end e-commerce order automation workflow using **SauceDemo**.

---

## Part 1: Module 8 Core Concepts & Prompts

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

## Part 2: Detailed Browser Navigation & Sample URL Prompts

### Detailed Navigation Prompt for Custom URLs:
> "Using the Playwright MCP browser tool:
> 1. Launch a browser instance and navigate to `https://testautomationpractice.blogspot.com/`.
> 2. Take a full-page screenshot and save it as `screenshots/homepage.png`.
> 3. Click on the 'Alerts & Popups' button to trigger a JavaScript alert.
> 4. Handle/accept the dialog box automatically.
> 5. Assert that the confirmation text message 'You pressed OK!' is fully visible on the page."

---

## Part 3: E-Commerce Project Prompt — SauceDemo Cart & Checkout Flow

This comprehensive prompt instructs the AI agent to open **SauceDemo**, log in, select two specific items, add them to the cart, proceed through checkout, and complete the order.

### **End-to-End SauceDemo Agent Prompt:**
> "Using the Playwright MCP browser tool and GitHub Copilot Agent mode, perform the following end-to-end shopping workflow on `https://www.saucedemo.com/` and write a complete, production-ready Playwright TypeScript test file named `tests/saucedemo-checkout.spec.ts`:
> 
> 1. **Login Phase**:
>    - Navigate to `https://www.saucedemo.com/`.
>    - Fill username with `standard_user` and password with `secret_sauce`.
>    - Click the Login button and verify redirection to the inventory page (`/inventory.html`).
> 
> 2. **Shopping / Cart Phase**:
>    - Add the 'Sauce Labs Backpack' and 'Sauce Labs Bike Light' to the cart by clicking their respective 'Add to cart' buttons.
>    - Verify that the shopping cart badge displays the count '2'.
>    - Click on the shopping cart icon to navigate to the cart page.
>    - Assert that both items are present in the cart list.
> 
> 3. **Checkout Phase**:
>    - Click the 'Checkout' button.
>    - Fill out the checkout information form: First Name = 'John', Last Name = 'Doe', Postal Code = '12345'.
>    - Click 'Continue' to go to the overview page.
>    - Verify the item total and tax calculations are displayed correctly.
>    - Click 'Finish' to complete the order.
> 
> 4. **Validation Phase**:
>    - Assert that the success header reads 'Thank you for your order!'.
>    - Ensure the dispatch confirmation message is visible.
>    - Generate clean, asynchronous TypeScript code with proper async/await syntax and strict Playwright assertions (`expect`)."