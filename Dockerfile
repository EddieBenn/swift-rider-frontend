FROM node
ENV NODE_ENV development
WORKDIR /app
COPY ["package.json","yarn.lock",".env","tsconfig.json","tsconfig.node.json",".eslintrc.json","./"]
COPY . .
RUN yarn
RUN yarn build
EXPOSE 3000
CMD ["yarn","dev"]