import React, { useState } from 'react';
import ticketsData from './tickets.json';

function App() {
  // 1. Setup State Hooks to track user inputs
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // 2. The Filter & Sort Engine (Runs on every user interaction)
  const filteredTickets = ticketsData
    .filter((ticket) => {
      // Filter by Status
      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      // Filter by Priority
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
      
      // Search by Title or Assignee (Case-Insensitive Substring Match)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.assignee.toLowerCase().includes(searchLower);

      return matchesStatus && matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      // Sort by Newest Date
      if (sortBy === 'newest') {
        return new Date(b.created_date) - new Date(a.created_date);
      }
      // Sort by Oldest Date
      if (sortBy === 'oldest') {
        return new Date(a.created_date) - new Date(b.created_date);
      }
      // Sort by Priority (High to Low)
      if (sortBy === 'priority-high') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  // 3. Live Summary Stats (Calculated directly from the filtered list)
  const totalCount = filteredTickets.length;
  const openCount = filteredTickets.filter(t => t.status === 'Open').length;
  const inProgressCount = filteredTickets.filter(t => t.status === 'In Progress').length;
  const closedCount = filteredTickets.filter(t => t.status === 'Closed').length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif', color: '#333' }}>
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>Support Ticket Triage Board</h1>
      </header>

      {/* Live Summary Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: '#eef2f7', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#666', uppercase: 'true' }}>Total Tickets</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalCount}</div>
        </div>
        <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#856404' }}>Open</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>{openCount}</div>
        </div>
        <div style={{ backgroundColor: '#cce5ff', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#004085' }}>In Progress</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#004085' }}>{inProgressCount}</div>
        </div>
        <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#155724' }}>Closed</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>{closedCount}</div>
        </div>
      </div>

      {/* Control Panel (Filters & Search) */}
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
        <input
          type="text"
          placeholder="Search title or assignee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px 12px', flex: '1', minWidth: '200px', borderRadius: '4px', border: '1px solid #ced4da' }}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}>
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}>
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority-high">Priority: High → Low</option>
        </select>
      </div>

      {/* Ticket Container / Empty State Rendering */}
      {filteredTickets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', border: '2px dashed #dee2e6', borderRadius: '6px', color: '#6c757d' }}>
          <h3>No tickets match your search parameters.</h3>
          <p style={{ margin: 0 }}>Try clearing your text or resetting dropdown filters.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} style={{ border: '1px solid #dee2e6', padding: '15px', borderRadius: '6px', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', color: '#495057' }}>{ticket.id}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold', backgroundColor: '#e9ecef' }}>
                    {ticket.status}
                  </span>
                  <span style={{ 
                    fontSize: '11px', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold',
                    backgroundColor: ticket.priority === 'High' ? '#f8d7da' : ticket.priority === 'Medium' ? '#fff3cd' : '#d1e7dd',
                    color: ticket.priority === 'High' ? '#842029' : ticket.priority === 'Medium' ? '#664d03' : '#0f5132'
                  }}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{ticket.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6c757d' }}>
                <div>Assignee: <strong style={{ color: '#212529' }}>{ticket.assignee}</strong></div>
                <div>Created: {new Date(ticket.created_date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;