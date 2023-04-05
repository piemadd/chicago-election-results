import { useEffect, useState } from "react";
import MapComponent from "../map";

const Index = () => {
  const [electionData, setElectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const update = () => {
      fetch("https://chicago-election.piemadd.com/results")
        .then((res) => res.json())
        .then((data) => {
          setElectionData(data);
          //setLoading(false);
          setTimeout(update, 1000 * 60);
        });
    };

    update();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatPercent = (num) => {
    return new Intl.NumberFormat("en-US", { style: "percent" }).format(num);
  };

  return (
    <>
      <section className='heading'>
        <h1>Chicago Election Results</h1>
        <p>
          The battle between{" "}
          <b>
            <i>
              <u>Pants Pisser</u>{" "}
            </i>{" "}
            Palos Paul
          </b>{" "}
          and <b>Brandon Johnson</b>
        </p>
      </section>
      <hr />
      <section className='contents'>
        <h2>Table of Contents</h2>
        <ol>
          <li>
            <p>
              <a href='#whowon'>Who won?</a>
            </p>
          </li>
          <li>
            <p>
              <a href='#results'>Results</a>
            </p>
          </li>
          <li>
            <p>
              <a href='#turnout'>Turnout</a>
            </p>
          </li>
          <li>
            <p>
              <a href='#map'>Election Map</a>
            </p>
          </li>
          <li>
            <p>
              <a href='#faqs-and-notes'>FAQs/Notes</a>
            </p>
          </li>
        </ol>
      </section>
      <hr />
      <section className='whowon' id='whowon'>
        <h2>Who won?</h2>
        <p className='sectiontitle'>I DON'T FUCKIN KNOW!!!</p>
        <p>(yet)</p>
        <p>
          Full election results will take some time to come in, but this will be
          updated once a handful of reputable sources have called the race.
        </p>
      </section>
      <hr />
      <p>
        <b>NOTE: </b>This page automatically updates every minute, there is no
        need to reload to get updated data.
      </p>
      <hr />
      <section className='turnout' id='results'>
        <section id='resultsTable'>
          <h2>Results</h2>
          {loading ? (
            <p>Loading results</p>
          ) : (
            <>
              <h3>Total</h3>
              <table>
                <tbody>
                  <tr>
                    <th>Total</th>
                    <th>Brandon Johnson :)</th>
                    <th>Palos Paul Vallas &gt;:(</th>
                  </tr>
                  <tr>
                    <td>{formatNumber(electionData.total.votes)}</td>
                    <td>
                      {formatNumber(electionData.total.votesJohnson)} (
                      {formatPercent(electionData.total.percentJohnson)})
                    </td>
                    <td>
                      {formatNumber(electionData.total.votesVallas)} (
                      {formatPercent(electionData.total.percentVallas)})
                    </td>
                  </tr>
                </tbody>
              </table>
              <h4>Bar Chart</h4>
              <div className='shittyBarGraph'>
                <div
                  className='shittyBarGraphBar'
                  style={{
                    width: `${
                      electionData.total.percentJohnson > 0
                        ? electionData.total.percentJohnson * 100
                        : 100
                    }%`,
                  }}
                >
                  <span>Brandon Johnson</span>
                  <span>
                    {formatNumber(electionData.total.votesJohnson)} (
                    {formatPercent(electionData.total.percentJohnson)})
                  </span>
                </div>
                <div
                  className='shittyBarGraphBar'
                  style={{
                    width: `${
                      electionData.total.percentVallas > 0
                        ? electionData.total.percentVallas * 100
                        : 100
                    }%`,
                  }}
                >
                  <span>Poopy Palos Paul</span>
                  <span>
                    {formatNumber(electionData.total.votesVallas)} (
                    {formatPercent(electionData.total.percentVallas)})
                  </span>
                </div>
              </div>
              <br />
              <details>
                <summary>See Breakdown by Ward</summary>
                <h3>Go to a Ward</h3>
                <select
                  name='ward-results'
                  id='ward-results'
                  onChange={(e) => {
                    window.location.hash = `#results-ward-${e.target.value}`;
                  }}
                >
                  <option value={""}>---</option>
                  {Object.keys(electionData.wards).map((ward) => {
                    return (
                      <option value={ward} key={ward}>
                        Ward {ward}
                      </option>
                    );
                  })}
                </select>

                {Object.keys(electionData.wards).map((ward) => {
                  const wardData = electionData.wards[ward];
                  return (
                    <div key={ward} id={`results-ward-${ward}`}>
                      <h3>Ward {ward}</h3>
                      <details>
                        <summary>Click to Expand</summary>
                        <table>
                          <tbody>
                            <tr>
                              <th>Precinct</th>
                              <th>Total</th>
                              <th>Brandon Johnson :)</th>
                              <th>Palos Paul Vallas &gt;:(</th>
                            </tr>
                            {Object.keys(wardData.precincts).map((precinct) => {
                              const precinctData = wardData.precincts[precinct];
                              return (
                                <tr key={precinct}>
                                  <td>{precinct}</td>
                                  <td>{formatNumber(precinctData.votes)}</td>
                                  <td>
                                    {formatNumber(precinctData.votesJohnson)} (
                                    {formatPercent(precinctData.percentJohnson)}
                                    )
                                  </td>
                                  <td>
                                    {formatNumber(precinctData.votesVallas)} (
                                    {formatPercent(precinctData.percentVallas)})
                                  </td>
                                </tr>
                              );
                            })}
                            <tr>
                              <th>Total</th>
                              <th>{formatNumber(wardData.votes)}</th>
                              <td>
                                {formatNumber(wardData.votesJohnson)} (
                                {formatPercent(wardData.percentJohnson)})
                              </td>
                              <td>
                                {formatNumber(wardData.votesVallas)} (
                                {formatPercent(wardData.percentVallas)})
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className='shittyBarGraph'>
                          <div
                            className='shittyBarGraphBar'
                            style={{
                              width: `${
                                wardData.percentJohnson > 0
                                  ? wardData.percentJohnson * 100
                                  : 100
                              }%`,
                            }}
                          >
                            <span>Brandon Johnson</span>
                            <span>
                              {formatNumber(wardData.votesJohnson)} (
                              {formatPercent(wardData.percentJohnson)})
                            </span>
                          </div>
                          <div
                            className='shittyBarGraphBar'
                            style={{
                              width: `${
                                wardData.percentVallas > 0
                                  ? wardData.percentVallas * 100
                                  : 100
                              }%`,
                            }}
                          >
                            <span>Poopy Palos Paul</span>
                            <span>
                              {formatNumber(wardData.votesVallas)} (
                              {formatPercent(wardData.percentVallas)})
                            </span>
                          </div>
                        </div>
                      </details>
                    </div>
                  );
                })}
              </details>
            </>
          )}
        </section>
      </section>
      <hr />
      <section className='turnout' id='turnout'>
        <section id='turnoutTable'>
          <h2>Turnout</h2>
          {loading ? (
            <p>Loading results</p>
          ) : (
            <>
              <h3>Total</h3>
              <table>
                <tbody>
                  <tr>
                    <th>Registered</th>
                    <th>Voted</th>
                    <th>Turnout</th>
                  </tr>
                  <tr>
                    <td>{formatNumber(electionData.total.registered)}</td>
                    <td>{formatNumber(electionData.total.votes)}</td>
                    <td>{formatPercent(electionData.total.turnout)}</td>
                  </tr>
                </tbody>
              </table>
              <details>
                <summary>See Breakdown by Ward</summary>
                <h3>Go to a Ward</h3>
                <select
                  name='ward-turnouts'
                  id='ward-turnouts'
                  onChange={(e) => {
                    window.location.hash = `#turnout-ward-${e.target.value}`;
                  }}
                >
                  <option value={""}>---</option>
                  {Object.keys(electionData.wards).map((ward) => {
                    return (
                      <option value={ward} key={ward}>
                        Ward {ward}
                      </option>
                    );
                  })}
                </select>

                {Object.keys(electionData.wards).map((ward) => {
                  const wardData = electionData.wards[ward];
                  return (
                    <div key={ward} id={`turnout-ward-${ward}`}>
                      <h3>Ward {ward}</h3>
                      <details>
                        <summary>Click to Expand</summary>
                        <table>
                          <tbody>
                            <tr>
                              <th>Precinct</th>
                              <th>Registered</th>
                              <th>Voted</th>
                              <th>Turnout</th>
                            </tr>
                            {Object.keys(wardData.precincts).map((precinct) => {
                              const precinctData = wardData.precincts[precinct];
                              return (
                                <tr key={precinct}>
                                  <td>{precinct}</td>
                                  <td>
                                    {formatNumber(precinctData.registered)}
                                  </td>
                                  <td>{formatNumber(precinctData.votes)}</td>
                                  <td>{formatPercent(precinctData.turnout)}</td>
                                </tr>
                              );
                            })}
                            <tr>
                              <th>Total</th>
                              <th>{formatNumber(wardData.registered)}</th>
                              <th>{formatNumber(wardData.votes)}</th>
                              <th>{formatPercent(wardData.turnout)}</th>
                            </tr>
                          </tbody>
                        </table>
                      </details>
                    </div>
                  );
                })}
              </details>
            </>
          )}
        </section>
      </section>
      <hr />
      <section id='map'>
        <h2>Map</h2>
        {
          //<MapComponent electionData={electionData} />
        }
        <p>Soon</p>
      </section>
      <section id='faqs-and-notes'>
        <h2>FAQs/Notes</h2>
        <br />
        <h3>FAQs</h3>
        <ul>
          <li>
            <p>
              <b>Q: Why is there so much cursing and so many bad words?</b>
            </p>
            <p>
              <b>A: </b>Because.
            </p>
          </li>
          <li>
            <p>
              <b>Q: Is this site biased at all?</b>
            </p>
            <p>
              <b>A: </b>Yes. Very much so. I voted for Brandon Johnson and you
              should have too.
            </p>
          </li>
          <li>
            <p>
              <b>Q: What did you use to build this site?</b>
            </p>
            <p>
              <b>A: </b>This site is built with Vite + React.js. I probably
              coulda used regular HTML + CSS + JS, I didn't want to deal with
              that for a really quick project.
            </p>
          </li>
        </ul>
        <h4>Notes</h4>
        <ul>
          <li>
            <p>
              If you would like to access the API powering this site for your
              own uses, it is available{" "}
              <a href='https://chicago-election.piemadd.com/results'>here</a>,
              with data updating every 2 minutes.
            </p>
          </li>
          <li>
            <p>
              Made by <a href='https://piemadd.com/'>Piero Maddaleni</a> &copy;
              2023
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Index;
