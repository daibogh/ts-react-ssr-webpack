import express from "express";
import fs from "fs";
import path from "path";
import ReactDOMServer from "react-dom/server";
import { App } from "../client/components/app";
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import React from "react";
import {StaticRouter} from "react-router-dom/server";
import {ChunkExtractor} from "@loadable/server";

const sheet = new ServerStyleSheet()
const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", express.static(path.join(__dirname, "static")));

const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);
const assets = JSON.parse(manifest);
const statsFile = path.resolve('./dist/static/loadable-stats.json')
server.get("*", async (req, res) => {
    const chunkExtractor = new ChunkExtractor({statsFile, entrypoints: ["client"] })
    const appElem = <StaticRouter location={req.url}>
        <StyleSheetManager sheet={sheet.instance}>
            <App />
        </StyleSheetManager>
    </StaticRouter>
    const collectedChunks = chunkExtractor.collectChunks(appElem);
    const scriptTags = chunkExtractor.getScriptTags()
    const component = ReactDOMServer.renderToString(
        collectedChunks
    )
  const styleTags = sheet.getStyleTags();
  res.render("client", { assets, component, styleTags, scriptTags });
});

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
