# cde-mapper
[![Codefresh develop status]( https://g.codefresh.io/api/badges/pipeline/tarelli/UCSD%20CDE%20Mapper%2Fdev?type=cf-1&key=eyJhbGciOiJIUzI1NiJ9.NWFkNzMyNDIzNjQ1YWMwMDAxMTJkN2Rl.-gUEkJxH6NCCIRgSIgEikVDte-Q0BsGZKEs4uahgpzs)]( https://g.codefresh.io/pipelines/edit/new/builds?id=659683be9eb2ec72fdada817&pipeline=dev&projects=UCSD%20CDE%20Mapper&projectId=659683a456001f332132073e)


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

## docker-compose

run
```bash
docker-compose up --build
```

stop:
```bash
docker-compose down
```

open the url http://localhost:8000/

