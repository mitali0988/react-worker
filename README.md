# React Virtualized List with Web Worker

This project demonstrates efficient rendering and filtering of 80,000 records in React using:

- [Vite](https://vitejs.dev/) as the build tool
- [React](https://reactjs.org/)
- [react-window](https://github.com/bvaughn/react-window) for virtualized list rendering
- A Web Worker for background filtering (non-blocking UI)
- Lodash debounce to optimize search input

## How to Run Locally

```bash
npm install
npm run dev
