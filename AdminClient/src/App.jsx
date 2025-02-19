import React, { useState, useEffect } from 'react'
import axios from './api.jsx'

const AdminDashboard = () => {
  const [redisTeams, setRedisTeams] = useState([])
  const [postgresTeams, setPostgresTeams] = useState([])
  const [newTeamName, setNewTeamName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTeams = async () => {
    setLoading(true)
    setError(null)
    try {
      const [redisData, postgresData] = await Promise.all([
        axios.get('admin/teams'),
        axios.get('admin/teams/postgres'),
      ])

      setRedisTeams(redisData.data)
      setPostgresTeams(postgresData.data)
    } catch (err) {
      setError('Failed to fetch teams')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createTeam = async (e) => {
    e.preventDefault()
    if (!newTeamName.trim()) return

    try {
      await axios.post('seed/team', { name: newTeamName })
      setNewTeamName('')
      fetchTeams()
    } catch (err) {
      setError('Failed to create team')
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Team Admin Dashboard
          </h1>

          {/* Create Team Form */}
          <form
            onSubmit={createTeam}
            className="bg-white rounded-lg p-4 shadow-sm mb-6"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Enter team name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Team
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            </div>
          )}

          {/* Data Display */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Redis Teams */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Redis Teams
                </h2>
                <button
                  onClick={fetchTeams}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        ID
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Warrior Level
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Wizard Level
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {redisTeams.map((team) => (
                      <tr key={team.id}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {team.id}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {team.warriorLevel}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {team.wizardLevel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Postgres Teams */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Postgres Teams
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        ID
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Warrior Level
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Wizard Level
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {postgresTeams.map((team) => (
                      <tr key={team.id}>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {team.id}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {team.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {team.warrior_level}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          {team.wizard_level}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
