import { useEffect, useState } from "react";

const Index = () => {
  const [electionData, setElectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const update = () => {
      fetch("https://chicago-election.piemadd.com/results")
        .then((res) => res.json())
        .then((data) => {
          setElectionData(data);
          setLoading(false);
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
              <a href='#turnout'>Turnout</a>
            </p>
            <ol type='a'>
              <li>
                <p>
                  <a href='#turnoutTable'>Table</a>
                </p>
              </li>
              <li>
                <p>
                  <a href='#turnoutGraph'>Graph</a>
                </p>
              </li>
            </ol>
          </li>
          <li>
            <p>
              <a href='#results'>Results</a>
            </p>
            <ol type='a'>
              <li>
                <p>
                  <a href='#resultsTable'>Table</a>
                </p>
              </li>
              <li>
                <p>
                  <a href='#resultsGraph'>Graph</a>
                </p>
              </li>
            </ol>
          </li>
          <li>
            <p>
              <a href='#map'>Election Map</a>
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
      <p><b>NOTE: </b>This page automatically updates every minute, there is no need to reload to get updated data.</p>
      <hr />
      <section className='turnout' id='results'>
        <section id='resultsTable'>
          <h2>Results Table</h2>
          {loading ? (
            <p>Loading results</p>
          ) : (
            <>
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
                                  {formatPercent(precinctData.percentJohnson)})
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
                    </details>
                  </div>
                );
              })}
            </>
          )}
        </section>
      </section>
      <hr />
      <section className='turnout' id='turnout'>
        <section id='turnoutTable'>
          <h2>Turnout Table</h2>
          {loading ? (
            <p>Loading results</p>
          ) : (
            <>
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
                                <td>{formatNumber(precinctData.registered)}</td>
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
            </>
          )}
        </section>
      </section>
      
    </>
  );
};

export default Index;
