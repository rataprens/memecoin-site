# 🚀 Memecoin Website Generator

The ultimate CLI tool to create sleek, customizable websites for your memecoin in minutes.

## 🌟 What is it?

`create-memecoin-site` is a command-line tool that generates modern, responsive websites for your memecoin project. Built with Gatsby, it offers:

- **Customizable themes:** Choose from dark, light, cyberpunk, and more.
- **Blockchain integration:** Supports Ethereum and Solana.
- **Dynamic content:** Add tokenomics, roadmaps, and step-by-step guides for users.
- **Quick setup:** Get your site up and running in seconds.
- **More than 100 themes available!**

## Demo

You can see a live demo of the memecoin site generator [here](https://demo-memecoin.netlify.app/).

## 🛠 Installation

### Using npx (recommended)

```sh
npx create-memecoin-site
```

### Or install it globally

```sh
npm install -g create-memecoin-site
```

Then run:

```sh
create-memecoin-site
```

## 🚀 How it Works

1. **Answer a few prompts:** Provide your memecoin's name, symbol, contract address, and more.
2. **Customize your site:** Choose a theme, blockchain, and background shape.
3. **Generate your template:** The tool creates a ready-to-use Gatsby project tailored to your memecoin.

 ![CLI-demo](https://github.com/user-attachments/assets/d06d855e-b5a0-461f-99bf-129980d610a4)


## 🎨 Features

- **Themes:** deepSea, dark, light, cyberpunk, matrix, and more.
- **Blockchain guides:** Step-by-step instructions for Ethereum and Solana.
- **Roadmap section:** Showcase your project's future plans.
- **Dynamic marquee text:** Add scrolling announcements like 🚀 New Features! or 🔥 Hot Deals!.

## ✨ Available Themes

With over 100 themes to choose from, you can style your memecoin website exactly how you want! Some examples include:

- **Dark**
- **Light**
- **Cyberpunk**
- **Neon**
- **Matrix**
- **Pastel**
- **Sunset**
- **Vaporwave**
- **Steampunk**
- **Aurora**
- And many more!

## 🎭 Header Types

You can customize the header style with different animations and effects:

- **Default:** A standard header with smooth animations.
- **Sliding:** A header that slides down from the top.
- **FadeIn:** A header that gradually fades into view.

Each header type has its own unique style and animation to enhance your website's appearance.

## 🔧 How to Customize

Customizing your generated site is easy! The configuration files allow you to modify every aspect of your website.

### 1. Main Site Configuration (`siteConfig.json`)

This file contains the core settings of your site, including:
- **Site name and title**
- **Memecoin name, symbol, and contract address**
- **Selected theme**
- **Blockchain settings**
- **Roadmap and disclaimer**
- **Marquee text (scrolling announcements)**

### 2. Header Configuration (`siteHeaderConfig.json`)

Here, you can modify the header style and animations by choosing between different header types like `default`, `sliding`, or `fadeIn`.

### 3. Theme Configuration (`themeConfig.json`)

This file includes all the themes and their respective styles, allowing full customization of the site's look and feel.

### 💡 Hint: Enabling Theme Customization (Development Only)

To preview and change theme settings live, you need to unlock the theme selector functionality in the code.

In the `pages/index.tsx` file, you will find the following lines:
```tsx
{/* <ShapeSelectorFloating onShapeChange={handleShapeChange} />
<ThemeSelectorFloating></ThemeSelectorFloating> 
<ClearStorageButton></ClearStorageButton> */}
```

> **⚠️ Note:**  
> For development purposes only, remove the comments around these lines to enable the live theme selector. In production, be sure to comment these lines back to prevent any changes.
>
> The changes made through these live selectors are only for previewing purposes and will persist in the localStorage on the client side while in development mode. These changes can be cleared by using the `ClearStorageButton` component, which will reset the theme and settings.
>
> The actual theme settings that dictate the appearance of your site are controlled by the `siteConfig.json` file, which is the one that actually dictates the theme and configuration of your site.

## 📜 License

MIT License. Free to use, modify, and share.

## 🙌 Contribute

Found a bug or have an idea? Open an issue or submit a pull request!

---

Launch your memecoin in style. Happy building! 🚀

