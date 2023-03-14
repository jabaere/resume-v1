import React, { FunctionComponent } from "react";

type CvProps = {
  data: any;
  id: string;
  title: string;
  title2: string;
  color: string;
};

export const CvItem: FunctionComponent<CvProps> = ({
  data,
  id,
  title,
  title2,
  color,
}) => {
 

  return (
    <div id={id}>
      <h3 style={{ color: "#4D4D4D", marginBottom: 0 }}>
        <span style={{ color: color }}>{title}</span>
        {title2}
      </h3>

      {data.map(
        (item: {
          year: string;
          company: string;
          city: string;
          description: string;
          job: string;
          name: string;
          techniques: string;
          source: string;
          title: string;
          provider: string;
          professionalInterest: string;
        },key:number) => (
          <div style={{ display: "flex", alignItems: "baseline" }} key={key}>
            <div>
              <p style={{ color: "#4D4D4D" }}>{item.year}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                id="title"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "400px",
                }}
              >
                <div
                  style={{
                    flex: 9,
                    marginLeft: id === "interests" ? 0 : 50,
                    marginBottom: id === "interests" ? 20 : -10,
                    color: "#4D4D4D",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {item.company ||
                    item.name ||
                    item.title ||
                    "professional: " + item.professionalInterest}
                </div>
                {id !== "interests" && (
                  <div
                    style={{
                      flex: 1,
                      marginLeft: 50,
                      color: "#4D4D4D",
                      fontSize: 10,
                      padding: 10,
                    }}
                  >
                    <a
                      style={{ color: "#4D4D4D", padding: 0 }}
                      href={item.source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {(id === "education" && "course") ||
                        item.city ||
                        item.provider ||
                        "source"}
                      {}
                    </a>
                  </div>
                )}
              </div>
              {id !== "awards" && (
                <div style={{ fontSize: 12, marginLeft: 50, color: "#4D4D4D" }}>
                  <i>
                    {item.techniques && "Used Techniques: "}
                    {item.description || item.techniques || item.title}
                  </i>
                </div>
              )}
              <div
                style={{
                  fontSize: 12,
                  marginLeft: 50,
                  color: "#4D4D4D",
                }}
              >
                {item.job}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
