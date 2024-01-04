# cde-mapper

## development

to run the application:
```bash
npm run dev
```

open the url http://localhost:5173/

## docker

build
```bash
docker build . -t cde-mapper:latest
```

run
```bash
docker run --name cde-mapper -e TZ=UTC -p 8000:80 cde-mapper
```

open the url http://localhost:8000/
